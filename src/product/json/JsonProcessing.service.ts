import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class JsonProcessingService<T>{
    private data: [T];

    constructor(){
        this.data = this.read_json_file();
    }


    private read_json_file(): [T]{

        const jsonString = fs.readFileSync('products.json', 'utf-8');
        const jsonData = JSON.parse(jsonString)['products'];
        
        return jsonData;
    }    

    public get_all(): [T]{
        return this.data;
    }

    public get_item(id: string): T {
        return this.data.find((item: T) => item['id'] === parseInt(id, 10))
    }

    public get_category_products(category: string): any {
        return this.data.filter((item: T) => item['category'] === category);
    }
}