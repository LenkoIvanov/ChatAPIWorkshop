export const getRandomNeonColor = (): string => {
    const neonColors = [
        "#182cd4",
        "#8f8bff",
        "#4deeea",
        "#cdfaf9",
        "#04005e",
        "#af92f9",
        "#440bd4",
        "#c99eed",
        "#ff489d",
        "#06dcd4",
        "#3433e0",
        "#f23de8",
        "#c4fa6f",
        "#95f7d0",
        "#c51f1e",
        "#3a3843",
      ];

    const maxNumber = neonColors.length;
    const minNumber = 1;
    const randomIdx = Math.floor(
      Math.random() * (maxNumber - minNumber) + minNumber
    );
    return neonColors[randomIdx];
};