import { useRef, useEffect, useState } from "react";

export default function Sky() {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // Fade in after 1 second

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width, height;
        const stars = [];
        const starCount = 150; // Increased star count
        const shootingStars = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.5, // Confined to the top half
                    radius: Math.random() * 1.2 + 0.3,
                    alpha: Math.random() * 0.6 + 0.2,
                    delta: Math.random() * 0.004 + 0.002,
                    speed: Math.random() * 0.01
                });
            }
        };
        resize();
        window.addEventListener("resize", resize);

        let nebulaAngle = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw a subtle, rotating nebula
            nebulaAngle += 0.0001;
            ctx.save();
            ctx.translate(width / 2, height / 4);
            ctx.rotate(nebulaAngle);
            const nebulaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width / 2);
            nebulaGradient.addColorStop(0, "rgba(255, 0, 255, 0.05)");
            nebulaGradient.addColorStop(0.5, "rgba(255, 0, 255, 0.02)");
            nebulaGradient.addColorStop(1, "rgba(255, 0, 255, 0)");
            ctx.fillStyle = nebulaGradient;
            ctx.fillRect(-width, -height / 2, width * 2, height);
            ctx.restore();

            const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
            skyGradient.addColorStop(0, "rgba(10, 10, 42, 0.9)");
            skyGradient.addColorStop(1, "rgba(15, 15, 58, 0)");
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, width, height * 0.6);

            stars.forEach((star) => {
                star.x += star.speed;
                if (star.x > width) star.x = 0;

                star.alpha += star.delta;
                if (star.alpha > 0.7 || star.alpha < 0.1) star.delta = -star.delta;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // Starlight glow
                const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5);
                glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.3})`);
                glowGradient.addColorStop(1, "transparent");
                ctx.fillStyle = glowGradient;
                ctx.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Add shooting stars occasionally
            if (Math.random() > 0.995) {
                shootingStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.2,
                    len: Math.random() * 80 + 20,
                    speed: Math.random() * 8 + 5,
                    alpha: 1
                });
            }

            shootingStars.forEach((ss, index) => {
                ss.x += ss.speed;
                ss.y += ss.speed * 0.5;
                ss.alpha -= 0.02;

                if (ss.alpha <= 0) {
                    shootingStars.splice(index, 1);
                }

                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.5);
                ctx.strokeStyle = `rgba(255, 255, 255, ${ss.alpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ background: "transparent" }}
            />
        </div>
    );
}
