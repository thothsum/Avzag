export type PieceDisplay = "plain" | "highlight" | "bold" | "phoneme";

export type Piece = {
  text: string;
  display: PieceDisplay;
};
