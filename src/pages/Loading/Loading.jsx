import React, { useEffect, useState } from "react";

function Loading({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      onFinish();
    }
  }, [progress, onFinish]);

  return (
    <div style={styles.container}>
      <div style={styles.titleWrapper}>
        <h1 style={styles.title}>SHOP CO</h1>
        <p>the best online website</p>
      </div>
      <div style={styles.lineWrapper}>
        <div style={{ ...styles.lineFill, width: `${progress}%` }} />
      </div>

      <p style={styles.loading}>Pages are loading...</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "opacity 0.5s ease-out"
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    justifyContent: "center",
  },
  title: {
    color: "#000000",
    fontSize: "28px",
    marginBottom: "30px",
    letterSpacing: "2px",
  },
  lineWrapper: {
    width: "280px",
    height: "5px",
    backgroundColor: "#9696b6",
    marginBottom: "15px",
    overflow: "hidden",
  },
  lineFill: {
    height: "100%",
    backgroundColor: "#000",
    transition: "width 0.05s linear",
  },
  loading: {
    color: "#4e4242",
    fontSize: "10px",
    letterSpacing: "3px",
  },
};

export default Loading;