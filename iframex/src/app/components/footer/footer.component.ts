import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  modalText: string;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
  }

  aboutUs() {
    this.modalText = "Iframe-X aids automating the collection of used Eyeglass frame donations, distributing them to the people who can't effort to buy. NGO's/Admins operation is hassle free now. Our Software manages to get the matching frames based on beneficiary requirement which helps NGO/Admin to make faster and better decision on distributing the eyeglass frames to the people who can't afford it. <br> Donor can donate used Eyeglass frames smoothly and efficiently. They can opt for pre-envelope, drop off or self paid envelope as per their comfort. <br> Beneficiary who can't afford to have Eyeglass frame  can freely provide their requirement an receive well conditioned frame in-short span of time.";
    this.openModal();
  }

  contactUs() {
    this.modalText = "Contact us through Email: baabbee-iframex@gmail.com";
    this.openModal();
  }

  help(){
    window.open("https://baabee421152059.wordpress.com/", "_blank");
  }

  openModal() {
    this.modalService.open('custom-modal-1');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
