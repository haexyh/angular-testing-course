import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";
import createSpyObj = jasmine.createSpyObj;

describe('CalculatorService', () => {
  let calculator: CalculatorService,
    loggerSpy: any;
  beforeEach(() => {
    console.log('calling before')
    loggerSpy = createSpyObj('LoggerService', ['log'])
    calculator = new CalculatorService(loggerSpy);
  })
  it('should add two numbers', () => {
    const result = calculator.add(2, 3);
    expect(result)
      .withContext('Unexpected Addition')
      .toBe(5)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  });

  it('should subtract two numbers', () => {
    const result = calculator.subtract(2, 3);
    expect(result)
      .withContext('Unexpected Subtraction')
      .toBe(-1)
  });
})
