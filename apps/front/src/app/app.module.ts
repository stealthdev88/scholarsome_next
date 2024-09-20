import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import {
  FontAwesomeModule,
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";
import { ModalModule } from "ngx-bootstrap/modal";
import { CookieModule } from "ngx-cookie";
import {
  faCaretSquareLeft,
  faClone,
  faUser,
  faPlusSquare,
  faTrashCan,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faCheckSquare,
  faEyeSlash,
  faCircleQuestion,
  faPenToSquare,
  faComments,
  faFlag,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faRectangleList
} from "@fortawesome/free-regular-svg-icons";
import { CreateModule } from "./create/create.module";
import { AppRoutingModule } from "./app-routing.module";
import { LandingModule } from "./landing/landing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProfileModule } from "./profile/profile.module";
import { HeadScriptsComponent } from "./head-scripts/head-scripts.component";
import { QuillConfigModule, QuillModule } from "ngx-quill";
import { HeaderModule } from "./header/header.module";
import { SettingsModule } from "./settings/settings.module";

// there's something weird that needs to be done with the webpack config
// to get this to work the correct way
// for now, a ts-ignore works fine
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as QuillNamespace from "quill";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Quill: any = QuillNamespace;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageResize from "quill-image-resize-module";
import { SharedService } from "./shared/shared.service";
import { FolderModule } from "./folder/folder.module";
Quill.register("modules/imageResize", ImageResize);

@NgModule({
  declarations: [AppComponent, HeadScriptsComponent],
  imports: [
    CreateModule,
    LandingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    CookieModule.withOptions(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ProfileModule,
    HeaderModule,
    SettingsModule,
    FolderModule,
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        imageResize: true,
        formula: true,
        keyboard: {
          bindings: {
            tab: {
              key: 9,
              handler: () => {
                const editors = document.querySelectorAll("quill-editor");

                const buttons = [
                  ...Array.from(editors[0].querySelectorAll("button")),
                  ...Array.from(editors[0].querySelectorAll("[role=\"button\"]")),
                  ...Array.from(editors[1].querySelectorAll("button")),
                  ...Array.from(editors[1].querySelectorAll("[role=\"button\"]"))
                ];

                for (const button of buttons) {
                  button.setAttribute("tabindex", "-1");
                }

                return true;
              }
            }
          }
        },
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["code-block", "formula"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["link", "image"],
          ["clean"]
        ]
      }
    })
  ],
  providers: [SharedService],
  bootstrap: [AppComponent, HeadScriptsComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
        faClone,
        faUser,
        faCaretSquareLeft,
        faPlusSquare,
        faTrashCan,
        faArrowAltCircleUp,
        faArrowAltCircleDown,
        faArrowAltCircleLeft,
        faArrowAltCircleRight,
        faCheckSquare,
        faEyeSlash,
        faCircleQuestion,
        faPenToSquare,
        faComments,
        faFlag,
        faRectangleList
    );
  }
}
