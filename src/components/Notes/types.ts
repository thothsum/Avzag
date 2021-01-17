export type PieceDisplay = "plain" | "highlight" | "grapheme" | "phoneme";

export type Piece = {
  text: string;
  display: PieceDisplay;
};
