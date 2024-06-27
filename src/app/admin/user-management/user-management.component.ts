import { map } from 'rxjs';
import { Component } from '@angular/core';
import { IUser } from 'src/app/_models/account.models';
import { AdminService } from '../admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/_modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  usersWithRoles: IUser[] = [];
  bsModalRe: BsModalRef;
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  onEditModal(user: IUser) {
    const init: any = {
      class: 'modal-dialog-centered',
      initialState: {
        title: 'Edit Roles',
        user,
        roles: this.getRoles(user),
      },
    };

    this.bsModalRe = this.modalService.show(RolesModalComponent, init);
    this.bsModalRe.content?.updatedRoles.subscribe({
      next: (roles: any) => {
        
        const rolesToUpdate = {
          rolesName: [
            ...roles
              .filter((r: any) => r.checked == true)
              .map((r: any) => r.name),
          ],
        };
        console.log( rolesToUpdate.rolesName);
        if(rolesToUpdate && rolesToUpdate.rolesName.length>0){

          this.adminService.editRoles(user.username,rolesToUpdate.rolesName).subscribe({
            next:(response:any)=>{
              user.roles=response
              console.log(response);
              
            }
          })
        }
      },
    });
  }

  private getRoles(user: IUser) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: { name: string; value: string; checked: boolean }[] =
      [
        { name: 'admin', value: 'admin', checked: false },
        { name: 'member', value: 'member', checked: false },
        { name: 'superAdmin', value: 'admin', checked: false },
      ];

    for (let i = 0; i < availableRoles.length; i++) {
      var isMatch = false;
      for (let j = 0; j < userRoles!.length; j++) {
        if (availableRoles[i].name == userRoles![j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }

    return roles;
  }
  private getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (response) => {
        this.usersWithRoles = response;
      },
    });
  }
}
