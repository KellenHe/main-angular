import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

export const THIRD_MODULES = [
  MarkdownModule.forRoot({ loader: HttpClient }),
];
