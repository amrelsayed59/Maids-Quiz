/** @description this interface is used to define the type for translation
 * in navbar component to determine it's content
 */
export interface Languages {
    /** the name for language such as `arabic` , `english` */
    langName: string;
    /** the translation file prifix sucha as `ar`,`en` */
    langFilePrifix: string;
    langIcon?: string;
  }
  