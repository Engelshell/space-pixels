/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * common.ts - part of Image Quantization Library
 */

export abstract class AbstractDistanceCalculator {
    protected _maxDistance : number;
    protected _whitePoint : { r : number; g : number; b : number; a : number };

    constructor() {
        this._setDefaults();

        // set default maximal color component deltas (255 - 0 = 255)
        this.setWhitePoint(255, 255, 255, 255);
    }

    setWhitePoint(r : number, g : number, b : number, a : number) : void {
        this._whitePoint  = {
            r : (r > 0) ? 255 / r : 0,
            g : (g > 0) ? 255 / g : 0,
            b : (b > 0) ? 255 / b : 0,
            a : (a > 0) ? 255 / a : 0
        };
        this._maxDistance = this.calculateRaw(r, g, b, a, 0, 0, 0, 0);
    }

    calculateNormalized(colorA, colorB) : number {
        return this.calculateRaw(colorA[0], colorA[1], colorA[2], colorA[3], colorB[0], colorB[1], colorB[2], colorB[3]) / this._maxDistance;
    }

    protected _setDefaults() : void {
    }

    /**
     * Calculate raw distance (non-normalized)
     */
    abstract calculateRaw(r1 : number, g1 : number, b1 : number, a1 : number, r2 : number, g2 : number, b2 : number, a2 : number) : number;
}
