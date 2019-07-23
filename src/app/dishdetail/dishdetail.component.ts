import { Component, OnInit, Input, ViewChild , Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { stringify } from 'querystring';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  // Comment Box

  commentBox: FormGroup;
  comment: Comment;

  // Error Handling

  errMess: string;

  formErrors = {
    author: '',
    rating: 5,
    comment: ''
  };

  validationMessages = {
    author: {
      required: 'Author\'s Name is required',
      minlength: 'Author\'s Name must be at least 2 characters long.',
    },

    comment: {
      required: 'Comment is required',
      minlength: 'Comment must be at least 2 characters long.',
    }
  };


  @ViewChild('cBox', {static: false}) commentBoxDirective;

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder, // Comment Box
              @Inject('BaseURL') public BaseURL
               ) {
                  this.createBox(); // Comment Box
                }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      // tslint:disable-next-line: no-string-literal
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => { this.dish = dish; this.setPrevNext(dish.id); },
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      errmess => this.errMess = <any> errmess);
  }

  // Dish Details

  setPrevNext(dishid: string) {
    const index = this.dishIds.indexOf(dishid);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  // Comment Box

  createBox() {
    this.commentBox = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.commentBox.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.commentBox) { return; }
    const form = this.commentBox;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.comment = this.commentBox.value;
    const x = Date();
    this.comment.date = x.toString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentBox.reset();
  }

}
