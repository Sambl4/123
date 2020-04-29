import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DurationFormatPipe } from './duration-format.pipe';


describe('DurationFormatPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new DurationFormatPipe();

  it('transforms "15" to "15 min."', () => {
    expect(pipe.transform(15)).toBe('15 min.');
  });

  it('transforms "90" to "1 h.   30 min."', () => {
    expect(pipe.transform(90)).toBe('1 h.   30 min.');
  });
});
