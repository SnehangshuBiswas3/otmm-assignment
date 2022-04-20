import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetList, SearchService } from '../services/search.service';

interface Asset {
  master_content_name: string;
  thumbnail_content_url: string;
  asset_id: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  assets: Asset[] = [];

  baseUrl = 'http://training-otmm.acheron-tech.com:11090';

  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl(''),
  });

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.searchService
      .search(this.searchForm.value.keyword)
      .subscribe((value) => {
        let v: AssetList[] = value.search_result_resource.asset_list.filter(
          (item) => !!item.rendition_content
        );

        this.assets = v.map((item) => {
          return {
            master_content_name: item.asset_content_info.master_content.name,
            thumbnail_content_url:
              this.baseUrl + item.rendition_content.thumbnail_content.url,
            asset_id: item.asset_id,
          };
        });
      });
  }
}
