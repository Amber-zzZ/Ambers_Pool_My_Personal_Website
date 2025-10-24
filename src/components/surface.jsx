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

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

           
            waves.length = 0;
            for (let i = 0; i < waveCount; i++) {
                waves.push({
                    amplitude: 20 + i * 10, 
                    speed: 0.003 + i * 0.002, 
                    offset: i * 50, 
                    colorAlpha: 0.08 - i * 0.02, 
                });
            }
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            time += 1;

           
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, "#2c1654"); 
            gradient.addColorStop(0.3, "#1a1f4b"); 
            gradient.addColorStop(0.6, "#0f2a4a"); 
            gradient.addColorStop(1, "#001f3f");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            waves.forEach((wave, i) => {
                ctx.beginPath();
                
                for (let x = 0; x <= width; x += 8) {
                    const angle = x * 0.01 + time * wave.speed;
                    const y =
                        height / 2 +
                        Math.sin(angle) * wave.amplitude +
                        wave.offset;
                    
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
               
                ctx.strokeStyle = `rgba(135, 206, 250, ${wave.colorAlpha})`; // 使用天蓝色
                ctx.lineWidth = 2.5;
                ctx.stroke();
            });

         
            const auroraCount = 4;
            for (let i = 0; i < auroraCount; i++) {
                const glowY = height * 0.25 + Math.sin(time * 0.001 + i) * 100;
                const glowX = (width / auroraCount) * i + ((time * 0.08) % width);

                const radial = ctx.createRadialGradient(glowX, glowY, 30, glowX, glowY, 300);
                
               
                const hue = (i * 80 + time * 0.1) % 360;
                radial.addColorStop(0, `hsla(${hue}, 85%, 75%, 0.12)`);
                radial.addColorStop(0.5, `hsla(${hue}, 85%, 60%, 0.06)`);
                radial.addColorStop(1, "transparent");

                ctx.fillStyle = radial;
                ctx.fillRect(0, 0, width, height);
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="opacity-70 transition-opacity duration-1000 ease-in-out">Amber Pool</h1>
            </div>
        </div>
    );
}
