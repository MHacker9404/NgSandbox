import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { COURSES } from './db-data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/courses')
  public async getAllCourses(): Promise<any> {
    return { ...COURSES };
  }
}
