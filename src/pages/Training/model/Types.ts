export type TrainingSingleIType = {
  text: string
}

export type ResultSingleType = {
  raw_text        : string,
  preproccess_text: string,
  summary    : string,
  best_score : number,
  tresh_hold : number,
  totallkata : number,
  calculate  : CalculateType[],
}

export type CalculateType = {
  kalimat  : string,
  totkata  : number,
  arr_kata : string[]
  tot_kata_dalam_text: any,
  TFWi     : any,
	IDFWi    : any,
	WWi      : any,
	TWWi     : any,
	NFS      : any,
	WS       : any,
}
