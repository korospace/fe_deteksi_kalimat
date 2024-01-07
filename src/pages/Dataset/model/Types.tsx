export interface DatasetType {
	id?:          number    
	raw:          string 
	clean:        string 
	stopword:     string 
	stemming:     string 
	tokenization: string 
	category:     string  
}

export interface DatasetImportType {
	file_dataset: any[] 
}