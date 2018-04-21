import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ticher',
  templateUrl: './ticher.component.html'
})
export class TicherComponent implements OnInit {
  loginForm: FormGroup;
  sub: any;
  id;
  showNameForm;
  testData;
  test_results;
  test_error;
  show_success;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.show_success = false;
    this.test_error = false;
    this.test_results = {};
    this.showNameForm = true;
    this.loginForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.http.get('https://demo-ticher.herokuapp.com/api/v0/auth-users/get-test/' + this.id + '/').subscribe((response: any) => {
      this.testData = response.results;
      function compare(a, b) {
        const genreA = a.id;
        const genreB = b.id;

        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
      this.testData.questions.sort(compare);
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.showNameForm = false;
    }
  }

  setAnswer(question_id, answer_id) {
    this.test_results[question_id] = {
      test_id: this.testData.test.id,
      question_id: question_id,
      answer_id: answer_id,
    };
  }

  endTest() {
    const result = Object.values(this.test_results);
    if (result.length === this.testData.questions.length) {
      this.http.post('https://demo-ticher.herokuapp.com/api/v0/auth-users/create-test-result/', {
        result: result,
        learner: this.loginForm.controls['name'].value
      }).subscribe((res) => {
        this.show_success = true;
      });
    } else {
      this.test_error = true;
    }
  }
}
