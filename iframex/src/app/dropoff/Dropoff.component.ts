import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'dropoff',
  templateUrl: './Dropoff.component.html',
  styleUrls: ['./Dropoff.component.css']
})
export class DropoffComponent implements OnInit {
  modalText: string;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    
  }
  // onRadioClick(){
  //   this.modalText = "Thank you for Dononating Eye Frames to IFramex Organisation!";
  //    this.openModal();
  // }
  // openModal() {
  //   this.modalService.open('custom-modal-1');
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }
}
