export type stringState = {
  loading: boolean;
  stringAll: Array<
    {
      "child": [
        null
      ],
      "equipmentCosts": number,
      "estimatedProfit": number,
      "id": number,
      "machineOperatorSalary": number,
      "mainCosts": number,
      "materials": number,
      "mimExploitation": number,
      "overheads": number,
      "rowName": "string",
      "salary": number,
      "supportCosts": number,
      "total": number
    } | any>;

};

export type getString =
  Array<
  {
    "child": [
      null
    ],
    "equipmentCosts": number,
    "estimatedProfit": number,
    "id": number,
    "machineOperatorSalary": number,
    "mainCosts": number,
    "materials": number,
    "mimExploitation": number,
    "overheads": number,
    "rowName": "string",
    "salary": number,
    "supportCosts": number,
    "total": number
  } | Array<null>>;

export type getNewString =  {
  "child": [
    null
  ],
  "equipmentCosts": number,
  "estimatedProfit": number,
  "id": number,
  "machineOperatorSalary": number,
  "mainCosts": number,
  "materials": number,
  "mimExploitation": number,
  "overheads": number,
  "rowName": "string",
  "salary": number,
  "supportCosts": number,
  "total": number
}
