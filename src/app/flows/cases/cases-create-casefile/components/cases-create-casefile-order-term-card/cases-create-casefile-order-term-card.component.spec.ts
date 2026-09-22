import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import type { ICasesCreateCasefileOrderTermCard } from '../../interfaces/cases-create-casefile-order-term-card.interface';
import { CasesCreateCasefileOrderTermCardComponent } from './cases-create-casefile-order-term-card.component';

describe('CasesCreateCasefileOrderTermCardComponent', () => {
  let fixture: ComponentFixture<CasesCreateCasefileOrderTermCardComponent>;
  const card: ICasesCreateCasefileOrderTermCard = {
    termId: 7,
    title: 'Maintenance',
    rows: [{ id: 'amount', label: 'Amount', value: '£10.00' }],
    bankRows: [
      { id: 'nameOnAccount', label: 'Name on account', value: 'Synthetic creditor' },
      { id: 'sortCode', label: 'Sort code', value: '001122' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CasesCreateCasefileOrderTermCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CasesCreateCasefileOrderTermCardComponent);
    fixture.componentRef.setInput('card', card);
  });

  it('renders the term and initially hides creditor bank rows', () => {
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('#order-term-7-creditor-toggle') as HTMLButtonElement;
    const bankPanel = fixture.nativeElement.querySelector('#order-term-7-bank') as HTMLDivElement;
    expect(fixture.nativeElement.querySelector('h2')?.textContent.trim()).toBe('Maintenance');
    expect(fixture.nativeElement.textContent).toContain('£10.00');
    expect(toggle.type).toBe('button');
    expect(toggle.getAttribute('aria-controls')).toBe('order-term-7-bank');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.textContent.trim()).toBe('Show creditor details');
    expect(bankPanel.hidden).toBe(true);
  });

  it('toggles creditor bank rows through native button activation', () => {
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('#order-term-7-creditor-toggle') as HTMLButtonElement;
    const bankPanel = fixture.nativeElement.querySelector('#order-term-7-bank') as HTMLDivElement;

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.textContent.trim()).toBe('Hide creditor details');
    expect(bankPanel.hidden).toBe(false);
    expect(bankPanel.textContent).toContain('Synthetic creditor');
    expect(bankPanel.textContent).toContain('001122');
  });

  it('renders no actions when none are projected', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.govuk-summary-card__action')).toHaveLength(0);
  });
});
