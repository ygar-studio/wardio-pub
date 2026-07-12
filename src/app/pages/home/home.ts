import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="py-12 text-center">
      <img src="logo.png" alt="" class="mx-auto h-16 w-16" />
      <h1 class="mt-4 text-5xl font-extrabold tracking-tight">
        <span class="text-gold">Wardio</span>
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-dim">
        Meta runes, builds and tier lists in champion select, a live in-game
        overlay with objective timers, and your own profile synced from the
        client. This site explores the same public data the app uses.
      </p>
      <div class="mt-7 flex justify-center">
        <a routerLink="/champions" class="hex-cta">Browse champions</a>
      </div>
    </section>

    <section class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      @for (f of features; track f.title) {
        <div class="hex-panel p-4">
          <h3 class="text-sm font-bold text-gold">{{ f.title }}</h3>
          <p class="mt-1 text-sm text-dim">{{ f.body }}</p>
        </div>
      }
    </section>
  `,
})
export class Home {
  readonly features = [
    {
      title: 'Pre-game',
      body: 'Runes, spells, item path, skill order, tier and counters for your pick — with one-click rune import.',
    },
    {
      title: 'Champions',
      body: 'Blitz-style build pages and a sortable tier list across every role.',
    },
    {
      title: 'In-game',
      body: 'Transparent overlay with Dragon / Baron / Herald timers and a live scoreboard.',
    },
    {
      title: 'Profile',
      body: 'Your Riot ID, level and ranked, auto-synced from the running client.',
    },
  ];
}
