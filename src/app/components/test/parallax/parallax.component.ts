import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss'],
})
export class ParallaxComponent implements OnInit {
  ngOnInit(): void {
    let text = document.getElementById('text');

    window.addEventListener('scroll', function () {
      var value = this.window.scrollY;
      text!.style.top = value * 0.3 + 'px';
    });
  }
}
