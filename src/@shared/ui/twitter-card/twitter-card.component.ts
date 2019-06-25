import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  template: `
    <mat-card class="TwitterCard" *ngIf="tweet">
      <mat-card-content>
        <div class="TwitterCard-content">
          <section class="TwitterCard-author">
            <a class="TwitterCard-avatar">
              <img [src]="tweet.avatar" />
            </a>
            <a class="TwitterCard-authorLink">
              <span class="TwitterCard-authorName">
                {{ tweet.name }}
              </span>
              <span class="TwitterCard-authorUsername">
                {{ tweet.username }}
              </span>
            </a>
          </section>
          <div class="TwitterCard-post">
            {{ tweet.post }}
          </div>

          <section class="TwitterCard-stats">
            <mat-icon class="TwitterCard-heart">favorite_outline</mat-icon>
            <span class="TwitterCard-actionCount">1k</span>
            <mat-icon class="TwitterCard-commented"
              >chat_bubble_outline</mat-icon
            >
            <span class="TwitterCard-actionCount">2k</span>
            <mat-icon class="TwitterCard-retweet">repeat</mat-icon>
            <span class="TwitterCard-actionCount">500</span>
            <a class="TwitterCard-tweetUrl">3:41 AM - June 20, 1958</a>
          </section>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  selector: "app-twitter-card",
  styleUrls: ["./twitter-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwitterCardComponent {
  @Input() tweet: any = {
    post:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    name: "Shiba Inu",
    username: "@shibaInu",
    avatar:
      "data:image/jpeg;base64,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"
  };
}
