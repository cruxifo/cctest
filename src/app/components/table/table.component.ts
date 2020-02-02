import {
     Component,
     Input,
     ViewChild,
     AfterViewInit,
     OnChanges,
     SimpleChanges,
     ChangeDetectionStrategy
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Record } from "../../interfaces";

@Component({
     selector: "app-table",
     templateUrl: "./table.component.html",
     styleUrls: ["./table.component.scss"],
     changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges, AfterViewInit {
     @Input() public data: Record[] = [];
     @Input() public filter = "";
     @ViewChild(MatSort, { static: true }) public sort: MatSort;
     @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

     public displayedColumns: (keyof Record)[] = [
          "name",
          "phone",
          "valid",
          "duplicate",
          "sent",
          "status",
          "errorCode"
     ];

     public dataSource = new MatTableDataSource<Record>([]);

     public ngOnChanges(changes: SimpleChanges) {
          if (changes.data) {
               this.dataSource.data = this.data;
          }
          if (changes.filter) {
               this.dataSource.filter = this.filter;
          }
     }

     public ngAfterViewInit() {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
     }
}
