import { useRef, useEffect } from "react";

export default function Sky() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width, height;
        const stars = [];
        const starCount = 120; // 略微增加星星数量

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            // 初始化星星
            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * (height * 0.4), // 限制在上部40%的区域
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.5 + 0.3,
                    delta: Math.random() * 0.003 + 0.001, // 缓慢闪烁
                    speed: Math.random() * 0.008 // 缓慢漂移
                });
            }
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // 绘制渐变夜空背景
            const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.5);
            skyGradient.addColorStop(0, "rgba(20, 20, 40, 0.95)"); // 更深邃的蓝色顶部
            skyGradient.addColorStop(1, "rgba(30, 30, 60, 0)"); // 渐变消失
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, width, height * 0.5);

            // 绘制星星
            stars.forEach((star) => {
                star.x += star.speed;
                if (star.x > width) star.x = 0;

                star.alpha += star.delta;
                if (star.alpha > 0.8 || star.alpha < 0.3) star.delta = -star.delta;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // 添加星光
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.radius * 4
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.2})`);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        draw();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: "transparent" }}
        />
    );
}
