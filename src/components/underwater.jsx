import { useRef, useEffect } from "react";

export default function Underwater() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width, height;
        const particles = [];
        const particleCount = 100;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 1,
                    speed: Math.random() * 0.5 + 0.1,
                    alpha: Math.random() * 0.5 + 0.1,
                });
            }
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, "#003366");
            bgGradient.addColorStop(1, "#001a33");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            <canvas ref={canvasRef} />
        </div>
    );
}
