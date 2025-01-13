class WaveEntity {
  private waveLength: number[];
  private gradientColors: string[];
  private amplitude: number;
  private base: number;

  constructor(
    waveLength: number[],
    amplitude: number,
    base: number,
    gradientColors: string[]
  ) {
    this.waveLength = waveLength;
    this.gradientColors = gradientColors;
    this.amplitude = amplitude;
    this.base = base;
  }

  public draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    frequency: number
  ): void => {
    context.beginPath();
    context.moveTo(0, height);

    const standardPpi = 96;
    const pointsPerInch = 15;
    const pointSpacing = standardPpi / pointsPerInch;

    for (let i = 0; i < width; i += pointSpacing) {
      const wave1 = Math.sin(i * this.waveLength[0] - frequency);
      const wave2 = Math.sin(i * this.waveLength[1] - frequency);

      context.lineTo(
        i * 2.5,
        height - (100 + this.base * 50) + wave1 * wave2 * 80 * this.amplitude
      );
    }

    context.lineTo(width, height);

    // Adjusted gradient with only two colors
    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, this.gradientColors[0]);
    gradient.addColorStop(1, this.gradientColors[1]);

    context.fillStyle = gradient;
    context.fill();
    context.closePath();
  };
}

export default WaveEntity;
