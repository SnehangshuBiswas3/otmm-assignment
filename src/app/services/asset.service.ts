import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl =
    'http://training-otmm.acheron-tech.com:11090/otmmapi/v6/assets';

  constructor(private http: HttpClient) {}

  geAssetDetails(assetId: string) {
    const url = `${this.baseUrl}/${assetId}?load_type=metadata`;
    return this.http.get(url);
  }
}
