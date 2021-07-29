import { format } from './utils';

describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(format(undefined, undefined, undefined)).toEqual('');
  });

  it('formats just title names', () => {
    expect(format('Joseph', undefined, undefined)).toEqual('Joseph');
  });

  it('formats title and last names', () => {
    expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
  });

  it('formats title, middle and last names', () => {
    expect(format('Joseph', 'Quincy', 'Publique')).toEqual(
      'Joseph Quincy Publique'
    );
  });
});
