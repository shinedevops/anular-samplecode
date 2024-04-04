import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { API_PATH } from 'src/app/constants/api-end-points';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss', '../../../styles/user-profile.scss']
})
export class PermissionsComponent implements OnInit {
    roleId: string = '';
    form: FormGroup;
    roleData: Array<any> = [];
    roleDeatil: any;
    constructor(private route: ActivatedRoute,
        private commonService: CommonService,
        private apiService: ApiService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router
    ) { }

    /**
     * @description on component initialization
     */
    ngOnInit(): void {
        let param = this.route.snapshot.params;
        if (param['id']) {
            this.roleId = param['id'];
            this.getPerMissisonList();
            this.initForm();
        }
    }

    /**
     * @description Get all permisssins with user assigned check
     */
    async getPerMissisonList() {
        try {
            this.commonService.showSpinner()
            const res$ = this.apiService.getReq(API_PATH.GET_PERMISSION + this.roleId)
            let response: any = await lastValueFrom(res$)
            if (response && response.data) {
                this.roleDeatil = response.data;
                this.roleData = response.data?.permissions;
                this.initForm();
            }
            this.commonService.hideSpinner()
        } catch (error: any) {
            this.commonService.hideSpinner()
            if (error.error && error.error.message) {
                this.commonService.showError(error.error.message)
            } else {
                this.commonService.showError(error.message)
            }
        }
    }

    /**
     * @description Init form for permissions
     */
    initForm() {
        let fGroup: any = [];
        for (let i = 0; i < this.roleData.length; i++) {
            let arr = [];
            for (let j = 0; j < this.roleData[i].permissions.length; j++) {
                let v = this.roleData[i].permissions[j].assigned;
                arr.push(new FormControl(v))
            }

            fGroup[`${this.roleData[i]._id}`] = this.fb.array(arr);
        }
        this.form = this.fb.group(fGroup);
    }

    /**
     * @description get form controls
     */
    get permisionFormControls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    /**
     * @description Update permissions of user
     * @returns 
     */
    updatePermissions(): void {
        try {
            let permissions = [];
            for (const key in this.form.value) {
                for (let i = 0; i < this.form.value[key].length; i++) {
                    if (this.form.value[key][i]) {

                        for (let id of this.roleData) {
                            if (id._id == key) {
                                permissions.push(id.permissions[i]._id);
                            }

                        }
                    }
                }
            }
            if (!permissions.length) {
                this.commonService.showError("Minimum one permission is required")
                return
            } else {
                this.submitUpdatePermissions(permissions);
            }
        } catch (error: any) {
            this.commonService.showError(error.message)
        }
    }

    /**
     * @description SUBMIT permission changes
     * @param permissions 
     */
    async submitUpdatePermissions(permissions: Array<string>) {
        try {
            this.commonService.showSpinner();
            let res$ = this.apiService.postReq(API_PATH.UPDATE_PERMISSION, { permissions: permissions, roleId: this.roleId });
            let response = await lastValueFrom(res$);
            if (response) {
                this.toastr.success(response?.message);
                this.router.navigate(['/u/role']);
            }
            this.commonService.hideSpinner();
        } catch (error: any) {
            this.commonService.hideSpinner();
            if (error && error.error) {
                this.commonService.showError(error.message)
            } else {
                this.commonService.showError(error.message)
            }
        }
    }

    
    goBack() {
        this.router.navigate(['/u/role'])
    }
}