import React, { useRef, useEffect } from "react";

const CanvasComponent = ({
  backgroundImageUrl,
  avatarUrl,
  username,
  displayName,

  //
  title,
  subtitle,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loadImage = async (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Handle CORS for external URLs
        img.onload = () => resolve(img);
        img.onerror = (err) => {
          console.error("Error loading image:", src, err);
          reject(err);
        };
        img.src = src;
      });
    };

    const drawCanvas = async () => {
      try {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set fallback background color
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Try loading images
        let background;
        try {
          background = await loadImage(backgroundImageUrl);
        } catch {
          console.warn("Using fallback background color");
        }

        let avatar;
        try {
          avatar = await loadImage(avatarUrl);
        } catch {
          console.warn("Using fallback avatar");
        }

        // Draw background image if available
        if (background) {
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }

        //         title,
        // subtitle

        // Add top text
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(title, canvas.width / 2, 50);
        ctx.fillText(subtitle, canvas.width / 2, 90);

        // Draw avatar at the bottom if available
        if (avatar) {
          const avatarSize = 100;
          const avatarX = canvas.width / 2 - avatarSize / 2;
          const avatarY = canvas.height - avatarSize - 60; // Padding from bottom
          ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
        } else {
          ctx.fillStyle = "grey";
          ctx.fillRect(canvas.width / 2 - 50, canvas.height - 160, 100, 100); // Placeholder avatar
        }

        // Add username and display name
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(
          `Username: ${username || "Unknown"}`,
          canvas.width / 2,
          canvas.height - 30
        );
        ctx.fillText(
          `Display Name: ${displayName || "Unknown"}`,
          canvas.width / 2,
          canvas.height - 10
        );
      } catch (error) {
        console.error("Error drawing canvas:", error);
      }
    };

    drawCanvas();
  }, [backgroundImageUrl, avatarUrl, username, displayName]);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      style={{ border: "1px solid black" }}
    />
  );
};

export default CanvasComponent;
