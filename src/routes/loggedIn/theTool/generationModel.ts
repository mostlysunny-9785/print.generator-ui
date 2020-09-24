export interface GenerationModel {
    // mandatory
    composition: CompositionTypes;
    tShirtType: TShirtTypes;
    tShirtColor: TShirtColors;
    canvasWidth: number;
    canvasHeight: number;


    // debug parameters
    drawAreaVisible: boolean;
    lotNumbers: boolean;
    picturesCount: number;
    wordsCount: number;
    columnsCount: number;
    qrCode: boolean;
    compositionStrategy: CompositionStrategies;
}

export enum CompositionTypes {
    GRID,
    RANDOM
}

export enum CompositionStrategies {
    DEFAULT,
    FULL_RANDOM,
    GOLDEN_CUT,
    LEFT_RIGHT,
    MAX_AREA,
    DONT_RESIZE
}

export enum TShirtTypes {
    TSHIRT,
    LONGSLEEVE
}

export enum TShirtColors {
    LIGHT,
    DARK
}

export const DefaultGenerationModel: GenerationModel = {
    composition: CompositionTypes.GRID,
    tShirtType: TShirtTypes.LONGSLEEVE,
    tShirtColor: TShirtColors.LIGHT,
    canvasWidth: 420,
    canvasHeight: 297,

    drawAreaVisible: true,
    lotNumbers: false,
    picturesCount: 3,
    wordsCount: 2,
    columnsCount: 2,
    qrCode: false,
    compositionStrategy: CompositionStrategies.DEFAULT
}

export interface Loc {
    x: number,
    y: number
}

export interface Area {
    x: number,
    y: number,
    width: number,
    height: number,
    folder: string
}

export interface ImageProps extends Area {
    originalWidth: number,
    originalHeight: number,
    ratio: number,
    path: string
}

export interface WordProps extends Area  {
    fontSize: string,
    fontFamily: string,
    text: string
}
