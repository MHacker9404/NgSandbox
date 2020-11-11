import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';

import { COURSES } from './db-data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/courses')
  public async getAllCourses(): Promise<any> {
    // return Object.values(COURSES);
    return { ...COURSES };
  }

  @Put('/api/courses/:id')
  public async putCourseChanges(
    @Param('id') id: number,
    @Body() changes: any,
  ): Promise<any> {
    return { id, changes };
  }
}
