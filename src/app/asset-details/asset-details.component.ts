import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';

interface Result {
  group_name: string;
  results: {
    name: string;
    value: any;
  }[];
}

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css'],
})
export class AssetDetailsComponent implements OnInit {
  assetId!: string;

  values: Result[] = [];

  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.assetId = data['id'];

      this.assetService.geAssetDetails(this.assetId).subscribe((value) => {
        // @ts-ignore
        this.data = value.asset_resource.asset.metadata.metadata_element_list;

        let x: Result[] = this.data.map((item: any) => {
          let f = item.metadata_element_list.filter((item: any) => item.value);

          let g = f.filter((item: any) => item.value.value);

          let results = g.map((d: any) => {
            return {
              name: d.name,
              value: d.value.value.value,
            };
          });

          return {
            group_name: item.name,
            results,
          } as Result;
        });

        this.values = x;
        console.log(x);
      });
    });
  }
}
