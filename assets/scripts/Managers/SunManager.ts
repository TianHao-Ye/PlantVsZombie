const { ccclass, property } = cc._decorator;

@ccclass
export default class SunManager {
  private _sunLayer: cc.Node = undefined;
  private _sunValue: number = undefined;

  public init(sunManager: cc.Node): void {
    this._sunLayer = sunManager;
  }

  public addSun(amount: number): void {
    this._sunValue += amount;
  }

  public useSun(amount: number): boolean {
    if (this._sunValue >= amount) {
      this._sunValue -= amount;
      return true;
    }
    return false;
  }

  public getSun(): number {
    return this._sunValue;
  }
}
