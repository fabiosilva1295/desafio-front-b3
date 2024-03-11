import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceService]
    });
    service = TestBed.inject(PriceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadQuotes', () => {
    it('should make a GET request to the correct URL with default parameters', () => {
      const from = 'USD';
      const to = 'BRL';
      const url = `https://api.invertexto.com/v1/currency/${from}_${to}?token=6939|LWHpBFAzfq1tiZD283eV1fuq0Flj0Lef`;

      service.loadQuotes();

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys().length).toBe(0);
      req.flush({});
    });

    it('should make a GET request to the correct URL with custom parameters', () => {
      const from = 'EUR';
      const to = 'USD';
      const url = `https://api.invertexto.com/v1/currency/${from}_${to}?token=6939|LWHpBFAzfq1tiZD283eV1fuq0Flj0Lef`;

      service.loadQuotes(from, to);

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.keys().length).toBe(0);
      req.flush({});
    });

    it('should update currencyQuotes with the response data', () => {
      const from = 'USD';
      const to = 'BRL';
      const response = { rate: 5.0 };

      service.loadQuotes();

      const req = httpMock.expectOne(`https://api.invertexto.com/v1/currency/${from}_${to}?token=6939|LWHpBFAzfq1tiZD283eV1fuq0Flj0Lef`);
      req.flush(response);

      service.currencyQuotes.subscribe((data) => {
        expect(data).toEqual(response);
      });
    });
  });
});