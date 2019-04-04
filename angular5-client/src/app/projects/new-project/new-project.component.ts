import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProjectInfo } from "../../resources/project";
import { ProjectService } from '../../api/project.service';
import { UtilService } from '../../util/util.service';
import { NewProjectCountService } from '../../api/newprojectcount.service';

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
    FIELD_MIN: number = 3;

    projectInfo: ProjectInfo = <ProjectInfo>{};
    projectForm: FormGroup;
    title: string;
    statusMessage: string;
    statusClass: string;
    isOnEditMode: boolean = false;

    constructor(private fb: FormBuilder,
        private utilService: UtilService,
        private projectService: ProjectService,
        private service: NewProjectCountService,
        private route: ActivatedRoute) {
        this.projectForm = fb.group({
            'name': ['', [Validators.required, Validators.minLength(this.FIELD_MIN), Validators.maxLength(100)]],
            'skills': ['', null],
            'dueDate': ['', Validators.required],
            'cost': ['', [Validators.required, Validators.max(99999999999)]],
            'description': ['', [Validators.required, Validators.minLength(this.FIELD_MIN), Validators.maxLength(500)]]
        });
    }

    ngOnInit() {
        const productID = this.route.snapshot.params['id'];
        if (productID) {
            this.loadProjectInfo(productID);
        }
        this.isOnEditMode = productID ? true : false;
    }

    loadProjectInfo(productID: number) {
        this.projectService.getProjectInfoById(productID)
            .subscribe(info => this.projectInfo = info);
    }

    onSubmit() {
        this.statusMessage = '';
        this.utilService.deepTrim(this.projectInfo);
        if (this.isOnEditMode) {
            this.updateProject();
        } else {
            this.createProject();
        }
    }

    private createProject() {
        this.projectService.createProjectInfo(this.projectInfo)
            .subscribe(
                () => {
                    this.displaySubmitMessage(false);
                },
                error => {
                    this.displaySubmitMessage(true);
                }
            );
    }

    private updateProject() {
        this.projectService.updateProjectInfo(this.projectInfo)
            .subscribe(
                () => {
                    this.displaySubmitMessage(false);
                },
                error => {
                    this.displaySubmitMessage(true);
                }
            );
    }

    private displaySubmitMessage(hasError: boolean) {
        if (hasError) {
            this.statusMessage = "Submission Failed !!!";
            this.statusClass = "restful_call_status_failed";
        } else {
            if (this.isOnEditMode) { //Editing existing project
                this.statusMessage = "Update Successful!";
                this.statusClass = "restful_call_status_ok ";
            } else {//Add new project
                this.statusMessage = "Submission Successful!";
                this.statusClass = "restful_call_status_ok ";
                this.service.newEvent('add');
            }
        }
    }
}
