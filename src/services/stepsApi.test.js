import { fetchSteps } from './stepsApi'

describe('fetchSteps', () => {
  it('returns an object if status code is ok', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve([])
      }),
    }));
    expect(fetchSteps()).resolves.toEqual([]);
  });

  it('returns only the latest versioned content for a step', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve([
          {
            "id": "d11b10ba-1cd8-48f8-93eb-454b716fd5a0",
            "stepNumber": "2",
            "versionContent": [
              {
                "title": "Request A Delivery",
                "body": "Once you’re ready for your first delivery, all it takes is a click to get your shipment on the way.",
                "effectiveDate": "2019-05-04T03:04:05.000Z"
              },
              {
                "title": "We Deliver",
                "body": "Once you’re ready for your first delivery, all it takes is a click to get your shipment on the way.",
                "effectiveDate": "2019-09-04T05:04:05.000Z"
              },
              {
                "title": "We Deliver blah",
                "body": "Once you’re ready for your first delivery, all it takes is a click to get your shipment on the way.",
                "effectiveDate": "2019-02-04T05:04:05.000Z"
              }
            ]
          }
        ])
      }),
    }));

    expect(fetchSteps()).resolves.toEqual([
      {
        "stepNumber": 2,
        "title": "We Deliver",
        "body": "Once you’re ready for your first delivery, all it takes is a click to get your shipment on the way."
      }
    ]);
  });

  it('returns items ordered by stepNumber', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve([
          {
            "id": "d11b10ba-1cd8-48f8-93eb-454b716fd5a0",
            "stepNumber": "2",
            "versionContent": [
              {
                "title": "Second Step",
                "body": "second step body",
                "effectiveDate": "2019-05-04T03:04:05.000Z"
              },
              {
                "title": "unused",
                "body": "unused",
                "effectiveDate": "2019-01-04T05:04:05.000Z"
              }
            ]
          },
          {
            "id": "d11b10ba-1cd8-48f8-93eb-454b716fd5a0",
            "stepNumber": "1",
            "versionContent": [
              {
                "title": "unused",
                "body": "unused",
                "effectiveDate": "2018-05-04T03:04:05.000Z"
              },
              {
                "title": "First Step",
                "body": "first step body",
                "effectiveDate": "2019-01-04T05:04:05.000Z"
              }
            ]
          },
          {
            "id": "d11b10ba-1cd8-48f8-93eb-454b716fd5a0",
            "stepNumber": "3",
            "versionContent": [
              {
                "title": "Third Step",
                "body": "third step body",
                "effectiveDate": "2019-05-04T03:04:05.000Z"
              }
            ]
          }
        ])
      }),
    }));

    return expect(fetchSteps()).resolves.toEqual([
      {
        "stepNumber": 1,
        "title": "First Step",
        "body": "first step body"
      },
      {
        "stepNumber": 2,
        "title": "Second Step",
        "body": "second step body"
      },
      {
        "stepNumber": 3,
        "title": "Third Step",
        "body": "third step body"
      }
    ]);
  });

  it('throws an error if status code is 500', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 500,
    }))
    expect(fetchSteps()).rejects.toEqual(Error('Error fetching steps'))
  })
})