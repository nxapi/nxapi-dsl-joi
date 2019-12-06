import TestReq from './req/test-req';
import TestDto from './dto/test-dto';
import BaseController from './base-controller';
import { d } from '@nxapi/nxapi';
import BaseResponse from './dto/base-response';

@d.controller.path('/v1')
export default class TestController extends BaseController {
  @d.function.description('ddddddd')
  @d.function.get('/hellopp')
  public ggg(req: TestReq, gg: number): BaseResponse<TestDto> {
    return null;
  }
  @d.function.post('post')
  public hhh(req: TestReq): TestDto {
    return new TestDto();
  }
}
