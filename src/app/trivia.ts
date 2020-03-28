export class Trivia {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  answers: Answer[];
}

export class Answer {
  answer: string;
  correctAnswer: boolean;
}
