import { Trivia, Answer } from './trivia';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    //public triviaList = [];
    trivia: Trivia;

    constructor(private appService: AppService, public snackBar: MatSnackBar){}

    ngOnInit() {
      this.getQuestions();
    }

    getQuestions() {
      this.appService.getQuestions().subscribe((result: any) => {
        console.log(result.results);
        this.parseTreeResult(result.results);
      }, error => {

      });
    }

    parseTreeResult(questionsList: any) {
        for (let question of questionsList) {
            this.trivia = new Trivia();
            this.trivia.category = question.category;
            this.trivia.difficulty = question.difficulty;
            this.trivia.question = question.question;
            this.trivia.type = question.type;

            let answers = [];

            let correctAnswer = new Answer();
            correctAnswer.answer = question.correct_answer;
            correctAnswer.correctAnswer = true;
            answers.push(correctAnswer);

            for (let answer of question.incorrect_answers) {
              let wrongAnswer = new Answer();
              wrongAnswer.answer = answer;
              wrongAnswer.correctAnswer = false;
              answers.push(wrongAnswer);
            }

            this.trivia.answers = this.shuffle(answers);
            //this.triviaList.push(trivia);
        }
    }

    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

    openSnackBar(message: string) {
      this.snackBar.open(message, 'close', {
         duration: 2000,
      });
    }

    answerQuestion(isCorrect: boolean) {
      if (isCorrect) {
        alert('Correct!');
        this.getQuestions();
      } else {
        alert('Wrong! Please try again.');
    }


}
}




