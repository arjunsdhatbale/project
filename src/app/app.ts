import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');

  name="Arjun Dhatbale"; 
  hello(){
    let x  = 10; 
    let b  = 30; 
    let c = x + b; 
    console.log("addition of a and b = " + c);
  }
}
