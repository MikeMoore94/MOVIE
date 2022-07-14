import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'movie';
import { MovieService } from 'movie.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {


  id!: number;
  movie: Movie = new Movie();
  constructor(private movieService: MovieService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.movieService.getMovieById(this.id).subscribe( data => {
      this.movie = data;
    }, error => console.log(error));
  }

  onSubmit(){
    this.movieService.updateMovie(this.id, this.movie).subscribe(data => {
      this.goToMovieList();
    }, error => console.log(error))
  }

  goToMovieList(){
    this.router.navigate(['/movies']);
  }

}
