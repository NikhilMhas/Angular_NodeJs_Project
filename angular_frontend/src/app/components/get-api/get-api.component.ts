import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-api',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-api.component.html',
  styleUrls: ['./get-api.component.css']
})
export class GetAPIComponent {
  userList: any[] = [];
  PutList: any = {
    id: null,
    title: '',
    productImage: [],
    price: 0,
    shortDescription: '',
    category: [],
    description: 'Default description',
    productUrl: 'https://example.com/default-url',
    tags: ['default-tag'],
    isFeatured: false,
  };

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get("http://localhost:3000/api/v1/projects").subscribe(
      (result: any) => {
        this.userList = result.data;
      },
      (error) => {
        console.error("Error fetching projects:", error);
      }
    );
  }

  PutUsers() {
    if (this.PutList.id) {
      this.http.put(`http://localhost:3000/api/v1/projects/${this.PutList.id}`, this.PutList).subscribe(
        (response: any) => {
          console.log("Project updated successfully", this.PutList);
          this.getUsers();
          this.resetForm();
        },
        (error) => {
          console.error("Error updating project", error);
        }
      );
    } else {
      this.http.post("http://localhost:3000/api/v1/projects", this.PutList).subscribe(
        (response: any) => {
          console.log("Project added successfully", response);
          this.getUsers();
          this.resetForm();
        },
        (error) => {
          console.error("Error adding project", error);
        }
      );
    }
  }

  EditUsers(project: any) {
    this.PutList = {
      ...project,
      productImageInput: project.productImage.join(', '), // Convert array to string
      categoryInput: project.category.join(', '), // Convert array to string
    };
  }
  

  deleteProject(projectId: number) {
    this.http.delete(`http://localhost:3000/api/v1/projects/${projectId}`).subscribe(
      () => {
        console.log('Project deleted successfully');
        this.getUsers();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }

  updateProductImage(value: string) {
    this.PutList.productImage = value.split(',').map((img) => img.trim());
  }

  updateCategory(value: string) {
    this.PutList.category = value.split(',').map((cat) => cat.trim());
  }

  resetForm() {
    this.PutList = {
      id: null,
      title: '',
      productImage: [],
      price: 0,
      shortDescription: '',
      category: [],
      description: 'Default description',
      productUrl: 'https://example.com/default-url',
      tags: ['default-tag'],
      isFeatured: false,
    };
  }
}
