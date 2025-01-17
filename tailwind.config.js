module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    darkMode: "class",
    theme: {
      extend: {
        animation: {
          first: "moveVertical 30s ease infinite",
          second: "moveInCircle 20s reverse infinite",
          third: "moveInCircle 40s linear infinite",
          fourth: "moveHorizontal 40s ease infinite",
          fifth: "moveInCircle 20s ease infinite",
          marquee: 'marquee 25s linear infinite',
          'marquee-reverse': 'marquee-reverse 25s linear infinite',
        },
        keyframes: {
          moveHorizontal: {
            "0%": {
              transform: "translateX(-50%) translateY(-10%)",
            },
            "50%": {
              transform: "translateX(50%) translateY(10%)",
            },
            "100%": {
              transform: "translateX(-50%) translateY(-10%)",
            },
          },
          moveInCircle: {
            "0%": {
              transform: "rotate(0deg)",
            },
            "50%": {
              transform: "rotate(180deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
          moveVertical: {
            "0%": {
              transform: "translateY(-50%)",
            },
            "50%": {
              transform: "translateY(50%)",
            },
            "100%": {
              transform: "translateY(-50%)",
            },
          },
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
          'marquee-reverse': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(0%)' },
          },
        },
            animation: {
              "meteor-effect": "meteor 5s linear infinite",
            },
            keyframes: {
              meteor: {
                "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                "70%": { opacity: "1" },
                "100%": {
                  transform: "rotate(215deg) translateX(-500px)",
                  opacity: "0",
                },
              },
            },
      },
    },
    plugins: [],
  };
  