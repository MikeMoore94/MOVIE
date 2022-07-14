import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'movie.service';
import { Movie } from '../../../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  searchTerm = '';
  term = '';

  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies() {
    this.movieService.getMovieList().subscribe(data => {
      this.movies = data;
    })
  }

  movieDetails(id: number){
    this.router.navigate(['movie-details', id]);
  }

  updateMovie(id: number){
    this.router.navigate(['update-movie', id]);
  }

  deleteMovie(id: number){
    this.movieService.deleteMovie(id).subscribe( data => {
      console.log(data);
      this.getMovies();
    })
  }

}
