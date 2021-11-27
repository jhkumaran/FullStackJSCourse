import * as utils from '../utils';

describe('Test utility functions', (): void => {
     it('test getAvailableImageNames success', async (): Promise<void> => {
          const imageNames: string[] = await utils.getAvailableImageNames();
          expect(imageNames.length).toBeGreaterThan(0);
     });

     it('test isImageAvailable for valid name: success', async (): Promise<void> => {
          const filename = 'fjord';
          const imageAvailable: boolean = await utils.isImageAvailable(
               filename
          );
          expect(imageAvailable).toBeTrue();
     });

     it('test isImageAvailable for invalid name: success', async (): Promise<void> => {
          const filename = 'fjord1';
          const imageAvailable: boolean = await utils.isImageAvailable(
               filename
          );
          expect(imageAvailable).toBeFalse();
     });

     it('test getFilePath for valid name(without height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const filePath: string = await utils.getFilePath(filename);
          expect(filePath.length).toBeGreaterThan(0);
     });

     it('test getFilePath for valid name(with valid height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const filePath: string = await utils.getFilePath(
               filename,
               '100',
               '100'
          );
          expect(filePath.length).toBeGreaterThan(0);
     });

     it('test getFilePath for valid name(with invalid height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const filePath: string = await utils.getFilePath(
               filename,
               '-200',
               '-300'
          );
          expect(filePath.length).toBeGreaterThan(0);
     });

     it('test checkThumbAvailable for valid name(with valid height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const isThumbAvailable: boolean = await utils.checkThumbAvailable(
               filename,
               '100',
               '100'
          );
          expect(isThumbAvailable).toBeTrue();
     });

     it('test checkThumbAvailable for valid name(with invalid height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const isThumbAvailable: boolean = await utils.checkThumbAvailable(
               filename,
               '-100',
               '-100'
          );
          expect(isThumbAvailable).toBeFalse();
     });

     it('test createThumbFile for valid name(with valid height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const errorMessage: string = await utils.createThumbFile(
               filename,
               199,
               199
          );
          expect(errorMessage.length).toBe(0);
     });

     it('test createThumbFile for valid name(with invalid height and width): success', async (): Promise<void> => {
          const filename = 'fjord';
          const errorMessage: string = await utils.createThumbFile(
               filename,
               -199,
               199
          );
          expect(errorMessage.length).toBeGreaterThan(0);
     });
});
