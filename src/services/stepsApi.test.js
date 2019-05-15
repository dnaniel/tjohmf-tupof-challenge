import { fetchSteps } from './stepsApi'

describe('fetchSteps', () => {
  it('returns an empty array if status code is ok', () => {
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
            "id": "422e6b50-9c5a-43d5-90cb-839f4678cb75",
            "stepNumber": "3",
            "versionContent": [
              {
                "title": "Keep What You Like",
                "body": "Tell us “no” by returning any unwanted products in the enclosed packaging.",
                "effectiveDate": "2019-04-04T03:04:05.000Z"
              },
              {
                "title": "Keep What You Want",
                "body": "Tell us “no thanks” by returning any unwanted products in the enclosed packaging.",
                "effectiveDate": "2019-04-04T05:04:05.000Z"
              },
              {
                "title": "Keep Everything",
                "body": "Tell us “no thanks” by returning any unwanted products in the enclosed packaging.",
                "effectiveDate": "2019-02-04T08:04:05.000Z"
              }
            ]
          }
        ])
      }),
    }));

    expect(fetchSteps()).resolves.toEqual([
      {
        "stepNumber": 3,
        "title": "Keep What You Want",
        "body": "Tell us “no thanks” by returning any unwanted products in the enclosed packaging."
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