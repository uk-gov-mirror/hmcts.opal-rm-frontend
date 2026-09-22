import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { GovukSummaryCardListComponent } from '@hmcts/opal-frontend-common/components/govuk/govuk-summary-card-list';
import {
  GovukSummaryListComponent,
  GovukSummaryListRowComponent,
} from '@hmcts/opal-frontend-common/components/govuk/govuk-summary-list';
import type { ICasesCreateCasefileOrderTermCard } from '../../interfaces/cases-create-casefile-order-term-card.interface';

@Component({
  selector: 'app-cases-create-casefile-order-term-card',
  imports: [GovukSummaryCardListComponent, GovukSummaryListComponent, GovukSummaryListRowComponent],
  templateUrl: './cases-create-casefile-order-term-card.component.html',
  styleUrl: './cases-create-casefile-order-term-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesCreateCasefileOrderTermCardComponent {
  public readonly card = input.required<ICasesCreateCasefileOrderTermCard>();
  public readonly expanded = signal(false);
  public readonly id = computed(() => 'order-term-' + this.card().termId);
  public readonly bankId = computed(() => this.id() + '-bank');
  public readonly bankListId = computed(() => this.id() + '-bank-list');

  public toggleCreditor(): void {
    this.expanded.update((value) => !value);
  }
}
