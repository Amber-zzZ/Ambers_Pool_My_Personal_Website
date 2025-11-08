import { useRef, useEffect } from "react";

export default function Surface() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width, height;
        let time = 0;

        const waveCount = 3;
        const waves = [];
        const particles = [];
        const particleCount = 50;
        const shimmerParticles = [];
        const shimmerCount = 100;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            const waveColors = ["#004080", "#008080", "#004080"];

            waves.length = 0;
            for (let i = 0; i < waveCount; i++) {
                waves.push({
                    amplitude: 20 + i * 10,
                    speed: 0.003 + i * 0.001,
                    offset: i * 10,
                    color: waveColors[i],
                });
            }

            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.2 + 0.3,
                    speed: Math.random() * 0.05 + 0.02,
                    alpha: Math.random() * 0.3 + 0.05,
                    delta: Math.random() * 0.002 - 0.001
                });
            }

            shimmerParticles.length = 0;
            for (let i = 0; i < shimmerCount; i++) {
                shimmerParticles.push({
                    x: Math.random() * width,
                    y: height * 0.7 + Math.random() * 50,
                    len: Math.random() * 20 + 5,
                    alpha: 0,
                    delta: Math.random() * 0.01 + 0.005,
                    waveIndex: Math.floor(Math.random() * waveCount)
                });
            }
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            time += 1;

            const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, "#000020");
            bgGradient.addColorStop(0.5, "#001030");
            bgGradient.addColorStop(1, "#000");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            waves.forEach((wave, waveIndex) => {
                ctx.beginPath();
                ctx.moveTo(0, height);
                let firstY = 0;
                for (let x = 0; x <= width; x += 10) {
                    const angle = x * 0.001 + time * wave.speed;
                    const y = height * 0.7 + Math.sin(angle) * wave.amplitude + wave.offset;
                    if (x === 0) {
                        firstY = y;
                        ctx.lineTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.lineTo(width, height);
                ctx.closePath();

                const r = parseInt(wave.color.slice(1, 3), 16);
                const g = parseInt(wave.color.slice(3, 5), 16);
                const b = parseInt(wave.color.slice(5, 7), 16);

                const waveGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);
                waveGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
                waveGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.05)`);

                ctx.fillStyle = waveGradient;
                ctx.fill();
            });

            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
                p.alpha += p.delta;
                if (p.alpha <= 0.05 || p.alpha >= 0.3) p.delta = -p.delta;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240, 240, 240, ${p.alpha})`;
                ctx.fill();
            });
            
            shimmerParticles.forEach(p => {
                const wave = waves[p.waveIndex];
                const angle = p.x * 0.001 + time * wave.speed;
                p.y = height * 0.7 + Math.sin(angle) * wave.amplitude + wave.offset;
                
                p.alpha += p.delta;
                if (p.alpha <= 0 || p.alpha >= 0.5) {
                    p.delta = -p.delta;
                    if (p.alpha <= 0) {
                        p.x = Math.random() * width;
                    }
                }

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.len, p.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });

            const vignette = ctx.createRadialGradient(width / 2, height / 2, width / 3, width / 2, height / 2, width);
            vignette.addColorStop(0, "rgba(0,0,0,0)");
            vignette.addColorStop(1, "rgba(0,0,0,0.8)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);

            const pulseAlpha = (Math.sin(time * 0.005) * 0.1) + 0.1;
            const pulseGradient = ctx.createRadialGradient(width / 2, height * 0.8, 0, width / 2, height * 0.8, 300);
            pulseGradient.addColorStop(0, `rgba(255, 0, 255, ${pulseAlpha * 0.5})`);
            pulseGradient.addColorStop(1, "transparent");
            ctx.fillStyle = pulseGradient;
            ctx.fillRect(0, 0, width, height);

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" />
        </div>
    );
}
