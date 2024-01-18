export class FileUtils {
  public static readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = (reader.result as string)!.split(',')[1];
        resolve(base64);
      };

      reader.onerror = error => reject(error);

      reader.readAsDataURL(file);
    });
  }
}
